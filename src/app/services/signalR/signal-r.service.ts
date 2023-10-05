import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  constructor() { 
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:7090/chatHub').withAutomaticReconnect()
    .build();
  }
  public startConnection(): void {
    this.hubConnection.start()
      .then(() => console.log('SignalR connection started.'))
      .catch(err => console.log('Error while starting SignalR connection: ' + err));
  }
  public sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }

  public onMessageReceived(callback: ( message: string) => void): void {
    this.hubConnection.on('ReceiveMessageFromMobile', callback);
  }

  public stopConnection():void{
    this.hubConnection.stop()
    .then(() => console.log('SignalR stoped.'))
    .catch(err => console.log('Error while stoped SignalR: ' + err));
  }
}
