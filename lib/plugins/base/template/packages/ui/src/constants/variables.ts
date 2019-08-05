const createQuery = (size: number, minMax = 'min') =>
  `@media screen and (${minMax}-width: ${size}px)`;

export const SIZES = {
  small: 575,
  medium: 768,
  large: 992,
  xlarge: 1240,
};

export const mediaQueries = {
  // Extra small devices
  xsmallQuery: createQuery(SIZES.small, 'max'),
  // Small devices (landscape phones, 576px and up)
  smallQuery: createQuery(SIZES.small),
  // Medium devices (tablets, 768px and up)
  mediumQuery: createQuery(SIZES.medium),
  // Large devices (desktops, 992px and up)
  largeQuery: createQuery(SIZES.large),
  // Extra large devices (large desktops, 1200px and up)
  xlargeQuery: createQuery(SIZES.xlarge),
};
