import { normalize } from "normalizr";

export const normalizeObject = (data, schema) => {
  return !!data && !!data[schema.idAttribute]
    ? normalize(data, schema)
    : { entities: {}, result: null };
};

export const normalizeArray = (data, schema) => {
  return !!data ? normalize(data, schema) : { entities: {}, result: [] };
};

export const myNormalize = (data, schema) => {
  return schema instanceof Array
    ? normalizeArray(data, schema)
    : normalizeObject(data, schema);
};

export const entityAdapterWithExtract = (
  entityAdapter,
  defaultNormalizedName
) => {
  const isPayloadCorrect = (payload) => {
    if (!!payload) return true;
    if (!payload instanceof Object) return false;
    const { entities, result } = payload;
    if (!entities || !entities instanceof Object) return false;
    if (result === undefined) return false;
    return true;
  };

  const assertPayloadCorrect = (payload) => {
    if (!isPayloadCorrect(payload)) {
      console.error("Expected to get valid payload, got ", payload);
      throw new TypeError(
        "Expected to get valid payload, got " + JSON.stringify(payload)
      );
    }
  };

  const extract = (
    payload,
    { name = defaultNormalizedName, mustBeObject = false, mustBeArray = false }
  ) => {
    assertPayloadCorrect(payload);
    const { entities } = payload;
    return mustBeArray && !mustBeObject
      ? Object.values(entities?.[name] || {})
      : Object.values(entities?.[name] || {})[0];
  };

  const extractById = (payload, id, { name = defaultNormalizedName }) => {
    return payload.entities?.[name]?.[id];
  };

  const upsertOneFromPayload = (
    state,
    payload,
    name = defaultNormalizedName
  ) => {
    const extractedEntity = extract(payload, { name, mustBeObject: true });
    if (extractedEntity) {
      entityAdapter.upsertOne(state, extractedEntity);
    }
  };

  const upsertManyFromPayload = (
    state,
    payload,
    name = defaultNormalizedName
  ) => {
    const extractedEntities = extract(payload, { name, mustBeArray: true });
    entityAdapter.upsertMany(state, extractedEntities);
  };

  const getInitialState = entityAdapter.getInitialState;
  const removeAll = entityAdapter.removeAll;
  const removeOne = entityAdapter.removeOne;
  const upsertOne = entityAdapter.upsertOne;

  return {
    extract,
    extractById,
    upsertOneFromPayload,
    upsertManyFromPayload,
    upsertOne,
    getInitialState,
    removeAll,
    removeOne,
  };
};
