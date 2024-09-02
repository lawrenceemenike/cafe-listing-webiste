document.addEventListener('DOMContentLoaded', () => {
    const cafesDiv = document.getElementById('cafes');
    const form = document.getElementById('add-cafe-form');

    function fetchCafes() {
        fetch('http://127.0.0.1:5000/cafes')
            .then(response => response.json())
            .then(data => {
                cafesDiv.innerHTML = '';
                data.cafes.forEach(cafe => {
                    const cafeDiv = document.createElement('div');
                    cafeDiv.className = 'cafe';
                    cafeDiv.innerHTML = `
                        <h2>${cafe.name}</h2>
                        <p>Location: ${cafe.location}</p>
                        <p>Seats: ${cafe.seats}</p>
                        <p>WiFi: ${cafe.has_wifi ? 'Yes' : 'No'}</p>
                        <p>Power: ${cafe.has_sockets ? 'Yes' : 'No'}</p>
                        <p>Toilet: ${cafe.has_toilet ? 'Yes' : 'No'}</p>
                        <p>Calls: ${cafe.can_take_calls ? 'Yes' : 'No'}</p>
                        <p>Price: ${cafe.coffee_price}</p>
                        <button onclick="deleteCafe(${cafe.id})">Delete</button>
                    `;
                    cafesDiv.appendChild(cafeDiv);
                });
            });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCafe = {
            name: document.getElementById('name').value,
            map_url: document.getElementById('map_url').value,
            img_url: document.getElementById('img_url').value,
            location: document.getElementById('location').value,
            seats: document.getElementById('seats').value,
            has_toilet: document.getElementById('has_toilet').checked,
            has_wifi: document.getElementById('has_wifi').checked,
            has_sockets: document.getElementById('has_sockets').checked,
            can_take_calls: document.getElementById('can_take_calls').checked,
            coffee_price: document.getElementById('coffee_price').value
        };
        fetch('http://127.0.0.1:5000/cafes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCafe)
        }).then(() => {
            fetchCafes();
            form.reset();
        });
    });

    window.deleteCafe = function(id) {
        fetch(`http://127.0.0.1:5000/cafes/${id}`, {
            method: 'DELETE'
        }).then(() => {
            fetchCafes();
        });
    };

    fetchCafes();
});