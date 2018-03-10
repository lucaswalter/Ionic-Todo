import { ArchivedTodosPage } from './../archived-todos/archived-todos';
import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { TodoProvider } from "../../providers/todo/todo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;

  constructor(
    private todoProvider: TodoProvider, 
    private navCtrl: NavController, 
    private alertController: AlertController,
    private toastController: ToastController) {
      this.todos = this.todoProvider.getTodos();
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  archiveTodo(index) {
    this.todoProvider.archiveTodo(index);

    let addTodoToast = this.toastController.create({
      message: "Todo Deleted!",
      duration: 2000
    });
    
    addTodoToast.present();
  }

  goToArchivePage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo Added!",
                duration: 2000
              });
              
              addTodoToast.present();
            });
          }
        }
      ]
    });

    addTodoAlert.present();
  }
}
