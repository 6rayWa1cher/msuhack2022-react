export const DirectionStrategyEnum = Object.freeze({
  FREE: "free",
  FIXED: "fixed",
  SINGLE_PER_USER: "single_per_user",
});

export const StatusEnum = Object.freeze({
  CREATED: "created",
  REG_ENDED: "reg_ended",
  FINISHED: "finished",
});

export const DirectionStrategyRu = Object.freeze({
  [DirectionStrategyEnum.FREE]: {
    up: "Свободный выбор направлений",
    down: "Свободный выбор направлений",
  },
  [DirectionStrategyEnum.FIXED]: {
    up: "Фиксированно вверх",
    down: "Фиксированно вниз",
  },
  [DirectionStrategyEnum.SINGLE_PER_USER]: {
    up: "Один выбор направления",
    down: "Один выбор направления",
  },
});

export const InvertedStockPricesRu = Object.freeze({
  true: "Инвертированные стоимости",
  false: "Обычные стоимости",
});

export const MultipliersRu = Object.freeze({
  true: "Без системы множителей",
  false: "С системой множителей",
});

export const StatusRu = Object.freeze({
  [StatusEnum.CREATED]: "Открыта регистрация",
  [StatusEnum.REG_ENDED]: "Регистрация закрыта",
  [StatusEnum.FINISHED]: "Конкурс окончен",
});

export const BriefcaseOnlyRu = Object.freeze({
  true: "Только акции из портфеля",
  false: "Свободный выбор акций",
});
