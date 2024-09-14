/**
 * @file main.js
 * @brief Главный файл для инициализации Vue-приложения.
 *
 * Этот файл отвечает за создание экземпляра Vue-приложения, регистрацию глобальных компонентов
 * и монтирование приложения в DOM.
 */

import { createApp } from 'vue';
import App from './App.vue';
import components from '@/components/UI';

// Создание экземпляра Vue-приложения
const app = createApp(App);

/**
 * Регистрация всех UI-компонентов как глобальных компонентов приложения.
 *
 * @param {Array} components - Массив UI-компонентов, которые будут зарегистрированы.
 */
components.forEach((component) => {
	app.component(component.name, component);
});

// Монтирование Vue-приложения в элемент с id="app"
app.mount('#app');
