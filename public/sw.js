self.addEventListener('push', function(e) {
  const message = e.data.json(); // 1

  const options = {
    // 2
    body: message.body,
    data: 'http://localhost:3007',
    actions: [
      {
        action: 'Detail',
        title: 'Detalles',
      },
    ],
  };

  e.waitUntil(self.registration.showNotification(message.title, options)); // 3
});

self.addEventListener('notificationClick', function(e) {
  console.log('Notification clicked received', e.notification.data);

  e.notification.close();

  e.waitUntil(clients.openWindow(e.notification.data));
});
