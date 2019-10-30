window.helloWorld = function (element) {
    return setInterval(() => {
        console.log('interval');
        element.innerText = new Date().toISOString();
    }, 1000)
};
