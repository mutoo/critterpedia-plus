export const waitAndScrollByElement = (selector, interval = 1000, retry = 10) =>
  new Promise((resolve, reject) => {
    let remainingRetry = retry;
    const waitingForElement = () => {
      remainingRetry -= 1;
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView();
        resolve(element);
      } else if (remainingRetry > 0) {
        setTimeout(waitingForElement, interval);
      } else {
        reject(new Error('element not found'));
      }
    };
    waitingForElement();
  });
