/* eslint-disable linebreak-style */
function loadExternalResources(resources) {
  return Promise.all(
    resources.map(
      (resource) => new Promise((resolve, reject) => {
        let element;

        if (resource.type === 'script') {
          element = document.createElement('script');
          element.src = resource.src;
          element.async = true;
          element.onload = resolve;
          element.onerror = reject;
        } else if (resource.type === 'link') {
          element = document.createElement('link');
          element.href = resource.href;
          element.rel = 'stylesheet';
          element.onload = resolve;
          element.onerror = reject;
        }

        document.head.appendChild(element);
      }),
    ),
  );
}

export default loadExternalResources;
