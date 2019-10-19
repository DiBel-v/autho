import Authorization from "./components/Authorization.vue";
import Student from "./components/Student.vue";
import Teacher from "./components/Teacher.vue";

export const routes = [
    {
        path: '/',
        component: Authorization
    },
    {
        path: '/student',
        component: Student
    },
    {
        path: '/teacher',
        component: Teacher
    },

]