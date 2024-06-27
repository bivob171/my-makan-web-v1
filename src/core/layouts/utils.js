/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param router
 * @param path
 */
export const handleURLQueries = (router, path) => {
  if (router && router.query && Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query);

    return (
      router.asPath.includes(path) &&
      router.asPath.includes(router.query[arr[0]]) &&
      path !== "/"
    );
  }

  return false;
};
