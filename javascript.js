
function initBootstrap(useFocusTrigger) {
    // 1. Clear existing instances to prevent memory leaks
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');

    popoverTriggerList.forEach(el => {
        // Initialize with 'click' trigger instead of 'focus' for better toggle control
        const popover = new bootstrap.Popover(el, {
            trigger: 'click',
            container: 'body',
            html: true
        });

        // 2. Add custom logic to close others when this one opens
        el.addEventListener('click', function (e) {
            popoverTriggerList.forEach(otherEl => {
                if (otherEl !== el) {
                    bootstrap.Popover.getInstance(otherEl)?.hide();
                }
            });
        });
    });

    // 3. Global listener to close popover when clicking outside (Background)
    document.addEventListener('click', function (e) {
        if (!e.target.closest('[data-bs-toggle="popover"]') && !e.target.closest('.popover')) {
            popoverTriggerList.forEach(el => {
                bootstrap.Popover.getInstance(el)?.hide();
            });
        }
    });
}