function setupPagination(containerId, itemsPerPage) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    const items = Array.from(container.children).filter(item => !item.classList.contains('pagination-controls'));
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 1;

    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        items.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function updatePaginationControls() {
        let paginationControls = container.querySelector('.pagination-controls');
        if (!paginationControls) {
            paginationControls = document.createElement('div');
            paginationControls.className = 'pagination-controls flex justify-center py-4';
            container.appendChild(paginationControls);
        }
        paginationControls.innerHTML = '';

        const joinDiv = document.createElement('div');
        joinDiv.className = 'join';

        const prevButton = document.createElement('button');
        prevButton.className = 'join-item btn';
        prevButton.textContent = '«';
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                updatePaginationControls();
            }
        };
        joinDiv.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = `join-item btn ${i === currentPage ? 'btn-active' : ''}`;
            pageButton.textContent = i;
            pageButton.onclick = () => {
                currentPage = i;
                showPage(currentPage);
                updatePaginationControls();
            };
            joinDiv.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.className = 'join-item btn';
        nextButton.textContent = '»';
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
                updatePaginationControls();
            }
        };
        joinDiv.appendChild(nextButton);

        paginationControls.appendChild(joinDiv);
    }

    showPage(currentPage);
    updatePaginationControls();
}


