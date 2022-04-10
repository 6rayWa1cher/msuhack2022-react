import {
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { unwrapResult } from "@reduxjs/toolkit";

import { entityAdapterWithExtract, myNormalize } from "@utils/redux";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import {
  deleteButtonApi,
  getButtonsByOwnerIdApi,
  putButtonApi,
} from "@api/buttons";
import { button } from "@validation/normalizr";

const buttonsSelector = (state) => state.buttons;

export const getButtonByIdSelector = createSelector(
  buttonsSelector,
  (_, { buttonId }) => buttonId,
  ({ entities }, buttonId) => entities[buttonId]
);

export const getAllButtonsByOwnerIdSelector = createSelector(
  buttonsSelector,
  (_, { ownerId }) => ownerId,
  ({ entities }, ownerId) =>
    Object.values(entities).filter((e) => e.owner === ownerId)
);

export const buttonsAdapter = entityAdapterWithExtract(
  createEntityAdapter(),
  "buttons"
);

export const getAllButtonsByOwnerThunk = createAsyncThunkWrapped(
  "buttons/getAllUserButtons",
  async ({ ownerId }) => {
    const response = await getButtonsByOwnerIdApi(ownerId);
    return myNormalize(response.data, [button]);
  }
);

export const putButtonThunk = createAsyncThunkWrapped(
  "buttons/putButton",
  async ({ buttonId, label, description, press_counter }) => {
    const response = await putButtonApi(buttonId, {
      label,
      description,
      press_counter,
    });
    return myNormalize(response.data, button);
  }
);

export const deleteButtonThunk = createAsyncThunkWrapped(
  "buttons/deleteButton",
  async ({ buttonId }) => {
    await deleteButtonApi(buttonId);
    return { buttonId };
  }
);

export const buttons = createSlice({
  name: "buttons",
  initialState: buttonsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteButtonThunk.fulfilled, (state, { payload }) => {
      buttonsAdapter.removeOne(state, payload.buttonId);
    });
    builder.addMatcher(
      isAnyOf(putButtonThunk.fulfilled),
      (state, { payload }) => {
        buttonsAdapter.upsertOneFromPayload(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(getAllButtonsByOwnerThunk.fulfilled),
      (state, { payload }) => {
        buttonsAdapter.removeAll(state);
        buttonsAdapter.upsertManyFromPayload(state, payload);
      }
    );
  },
});

const reducer = buttons.reducer;
export default reducer;
