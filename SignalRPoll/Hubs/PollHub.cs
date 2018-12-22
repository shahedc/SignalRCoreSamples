using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class PollHub : Hub
    {
        public async Task SendMessage(string user, string message, string myCaptainId, string myCaptainVal)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, myCaptainId, myCaptainVal);
        }
    }
}