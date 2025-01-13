import { createSlice } from '@reduxjs/toolkit'

const initRecipe = {
     value: [
    //     { 
    //         id: 1, 
    //         name: 'פסטה ברוטב עגבניות', 
    //         prepTime: '20 ', 
    //         ingredients: ['פסטה', 'רוטב עגבניות', 'תבלינים'], 
    //         category: 'פרווה', 
    //         isFavorite: false,
    //         image: '/images/Pasta.jpg.webp',
    //         instructions: [
    //             'בשל את הפסטה לפי הוראות היצרן.',
    //             'חממים את הרוטב בסיר, מתבלים לפי טעמך.',
    //             'מערבבים את הפסטה עם הרוטב ויוצרים מנות.'
    //         ]
    //     },
    //     { 
    //         id: 2, 
    //         name: 'קארי עוף', 
    //         prepTime: ' 40 ', 
    //         ingredients: ['עוף', 'קוקוס', 'תבלינים'], 
    //         category: 'בשרי', 
    //         isFavorite: false,
    //         image: '/images/chicken.webp',
    //         instructions: [
    //             'חממים שמן בסיר ומטגנים את העוף עד שהוא שחום.',
    //             'מוסיפים את החלב קוקוס והתבלינים, מבשלים על להבה נמוכה עד שהעוף רך.'
    //         ]
    //     },
        { 
            id: 3, 
            name: 'מרק ירקות', 
            prepTime: ' 30 ', 
            ingredients: ['תפוחי אדמה', 'גזר', 'סלרי', 'בצל'], 
            category: 'פרווה', 
            isFavorite: false,
            image: '/images/SOUP.webp',
            instructions: [
                'קולפים וחותכים את הירקות לקוביות.',
                'מבשלים את הירקות במים עד שהם רכים.',
                'ממליחים ומפמינים לפי הטעם.'
            ]
        },
        { 
            id: 4, 
            name: 'שקשוקה', 
            prepTime: ' 25 ', 
            ingredients: ['עגבניות', 'ביצים', 'פלפל חריף', 'שום'], 
            category: 'חלבי', 
            isFavorite: false,
            image: '/images/Shakshuka.webp',
            instructions: [
                'מטגנים את השום והפלפל החריף בשמן עד שהם מתרככים.',
                'מוסיפים את העגבניות ומבשלים עד שהן מתרככות.',
                'שמים ביצים על התערובת ומבשלים עד שהן מוכנות.'
            ]
        },
        { 
            id: 5, 
            name: 'סטייק אנטרקוט', 
            prepTime: ' 15 ', 
            ingredients: ['סטייק', 'שמן זית', 'מלח', 'פלפל'], 
            category: 'בשרי', 
            isFavorite: false,
            image:'/images/steak.webp',
            instructions: [
                'מחממים את השמן במחבת חמה.',
                'מטגנים את הסטייק עד שהוא מבושל לפי טעמכם.',
                'מתבלים במלח ופלפל לפי הטעם.'
            ]
        },
        { 
            id: 6, 
            name: 'פיצה מרגריטה', 
            prepTime: ' 35 ', 
            ingredients: ['בצק פיצה', 'גבינה', 'רוטב עגבניות'], 
            category: 'חלבי', 
            isFavorite: false,
            image:'/images/pizza.webp',
            instructions: [
                'מרדדים את הבצק לפיצה.',
                'מרחים רוטב עגבניות על הבצק.',
                'מפזרים גבינה ומניחים בתנור עד שהפיצה מוכנה.'
            ]
        },
        { 
            id: 7, 
            name: 'חזה עוף בתנור', 
            prepTime: ' 50 ', 
            ingredients: ['חזה עוף', 'שמן זית', 'תבלינים'], 
            category: 'בשרי', 
            isFavorite: false,
            image:'/images/chickenbreast.webp',
            instructions: [
                'מחממים תנור ל-180 מעלות.',
                'משרים את חזה העוף בשמן זית עם תבלינים.',
                'אופים בתנור במשך 40-50  עד שהעוף מוכן.'
            ]
        },
        { 
            id: 8, 
            name: 'פלאפל', 
            prepTime: ' 45 ', 
            ingredients: ['חומוס', 'פטרוזיליה', 'תבלינים'], 
            category: 'פרווה', 
            isFavorite: false,
            image:'/images/Falafel.webp',
            instructions: [
                'משרים את החומוס למשך לילה.',
                'טוחנים את החומוס עם פטרוזיליה ותבלינים.',
                'יוצרים כדורים ומטגנים בשמן חם עד הזהבה.'
            ]
        },
        { 
            id: 9, 
            name: 'מוקפץ ירקות', 
            prepTime: ' 20 ', 
            ingredients: ['גזר', 'פלפל אדום', 'קישואים', 'סויה'], 
            category: 'פרווה', 
            isFavorite: false,
            image:'/images/vegetable.webp',
            instructions: [
                'חותכים את הירקות לרצועות .',
                'מטגנים את הירקות במחבת עם שמן עד שהם רכים.',
                'מוסיפים סויה ומערבבים.'
            ]
        },{ 
            id: 10, 
            name: 'עוגת שוקולד', 
            prepTime: ' 60 ', 
            ingredients: ['חמאה','שוקולד', 'קמח', 'ביצים', 'סוכר'], 
            category: 'חלבי', 
            isFavorite: false,
            image:'/images/choklateCake.webp',
            instructions: [
                'שמים את השוקולד והחמאה במיקרו וממיסים.',
                'מערבבים את הסוכר והקמח עם הביצים.',
                'אופים בתנור בחום של 180 מעלות למשך 30-40 .'
            ]
        }
    ]
}


const ArrRecipesSlice = createSlice({
    name: "ArrRecipes",
    initialState: initRecipe,
    reducers: {
        updateFavorite: (state, action) => {
            const { id, isFavorite } = action.payload;
            const recipe = state.value.find((recipe) => recipe.id === id);
            recipe.isFavorite = isFavorite;
        },
        createRecipe: (state, action) => {
            const newRecipe = action.payload;
            state.value.push(newRecipe);
        }
    }
})

export const { updateFavorite, createRecipe } = ArrRecipesSlice.actions;
export default ArrRecipesSlice.reducer;
