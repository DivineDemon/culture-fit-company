import { api } from "./core";

export const files = api.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query({
      query: (id: string) => ({
        url: `/company-files/${id}/complete-files`,
        method: "GET",
      }),
      providesTags: ["files"],
      transformResponse: (response: { status: string; message: string; data: GetFolders }) => response.data,
    }),
    postFolder: build.mutation<Folder, Partial<Folder>>({
      query: (data) => ({
        url: "/folder/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["files"],
      transformResponse: (response: { status: string; message: string; data: Folder }) => response.data,
    }),
    getFolders: build.query({
      query: (id: string) => ({
        url: `/folder/${id}`,
        method: "GET",
      }),
      providesTags: ["files"],
      transformResponse: (response: { status: string; message: string; data: Folder }) => response.data,
    }),
    updateFolder: build.mutation({
      query: ({ id, data }: { id: string; data: Folder }) => ({
        url: `/folder/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["files"],
      transformResponse: (response: { status: string; message: string; data: Folder }) => response.data,
    }),
    deleteFolder: build.mutation({
      query: (id: string) => ({
        url: `/folder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["files"],
    }),
    moveFile: build.mutation<void, { id: string; folder_id: string }>({
      query: ({ id, folder_id }) => ({
        url: `/folder/${folder_id}/file/${id}/move`,
        method: "PUT",
      }),
      invalidatesTags: ["files"],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFoldersQuery,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  usePostFolderMutation,
  useMoveFileMutation,
} = files;
