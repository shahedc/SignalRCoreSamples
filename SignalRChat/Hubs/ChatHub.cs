using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    // The ChatHub class inherits from the SignalR Hub class. 
    // The Hub class manages connections, groups, and messaging.
    public class ChatHub : Hub
    {
        // The SendMessage method can be called by any connected client. 
        // It sends the received message to all clients. 
        // SignalR code is asynchronous to provide maximum scalability.
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}