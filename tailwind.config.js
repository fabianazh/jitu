import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: 'Poppins',
                ubuntu: 'Ubuntu',
            },
            divideWidth: {
                1.5: '1.5px',
            },
            borderWidth: {
                1.5: '1.5px',
            },
        },
    },

    plugins: [forms],
}
