import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectBackendToken } from "../auth/authSlice";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = selectBackendToken(getState());
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Event"],
  endpoints: (builder) => ({
    /**
     * @query getEvents
     * @desc Fetches the complete list of events for the user.
     * @providesTags Provides a general 'LIST' tag for the collection and individual tags for each event.
     */
    getEvents: builder.query({
      query: () => "/events?limit=all",
      providesTags: (result) =>
        result && result.events
          ? [
              ...result.events.map(({ _id }) => ({ type: "Event", id: _id })),
              { type: "Event", id: "LIST" },
            ]
          : [{ type: "Event", id: "LIST" }],
    }),

    /**
     * @query getEventById
     * @desc Fetches a single event by its unique ID.
     * @providesTags Provides a specific tag for this event instance.
     */
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    /**
     * @mutation createEvent
     * @desc Creates a new event.
     * @invalidatesTags Invalidates the 'LIST' tag, which automatically triggers a refetch of the getEvents query.
     */
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: "/events",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: [{ type: "Event", id: "LIST" }],
    }),

    /**
     * @mutation updateEvent
     * @desc Updates an existing event.
     * @invalidatesTags Invalidates both the specific event tag (for detail views) and the 'LIST' tag (for the main table).
     */
    updateEvent: builder.mutation({
      query: ({ id, ...updatedEvent }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: updatedEvent,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Event", id },
        { type: "Event", id: "LIST" },
      ],
    }),

    /**
     * @mutation deleteEvent
     * @desc Deletes an event by its ID.
     * @invalidatesTags Invalidates the 'LIST' tag to refresh the events table after deletion.
     */
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Event", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
