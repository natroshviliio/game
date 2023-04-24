import React, { useEffect, useState } from 'react'

const YouWin = () => {
    const [screenWin, setScreenWin] = useState(false);

    const dialog = [
        {
            text: `შეუძლებელია! ჩემი დამარცხება არავის შეუძლია!`,
            class: "youwin_death"
        },
        {
            text: `თეორიულად შესაძლებელია`,
            class: "youwin_he"
        },
        {
            text: `შენ ერთადერთი არ ხარ ვინც დავამარცხე`,
            class: "youwin_she"
        },
        {
            text: `ბეიბ კიდე ვინ დაამარცხე??`,
            class: "youwin_he"
        },
        {
            text: `შენ ხო გიწევ ხოლმე ხელს 🤷‍♂️`,
            class: "youwin_she"
        },
        {
            text: `კი ეგ რათქმაუნდა ჩემო ცხოვრებავ 💖`,
            class: "youwin_he"
        },
        {
            text: `თქვენ რა სულ გაგიჟდით? რა დროს ხელების გადაწევაა😡, ეს ამბავი ასე არ დასრულდება👿`,
            class: "youwin_death"
        },
        {
            text: `ეს ამბავი აქ და ახლა დასრულდება, ბეიბ, დაასრულე`,
            class: "youwin_he"
        },
        {
            text: `Ia used an Death Rune`,
            class: "youwin_she"
        },
        {
            text: `არა, არა! ოღონდ სიკვდილის რუნა არ გამოიყენო`,
            class: "youwin_death"
        },
        {
            text: `ჰაჰ... რა საინტერესოა, იმედები თვით სიკვდილსაც კი ქონია...`,
            class: "youwin_she"
        },
        {
            text: `Death has been exploded`,
            class: "youwin_death"
        },
    ]

    const [showDialog, setShowDialog] = useState([]);

    const [int, setInt] = useState(0);
    useEffect(() => {
        let interval;
        if (int < 12) {
            interval = setInterval(() => {
                if (int >= 6) {
                    const _dialog = [...showDialog].filter((x, i) => i > 0);
                    setShowDialog([..._dialog, dialog[int]]);
                } else {
                    setShowDialog([...showDialog, dialog[int]]);
                }
                setInt(int + 1);
            }, 4500);
        } if (int === 12) {
            setTimeout(() => {
                setScreenWin(true)
            }, 4500);
        }

        return () => clearInterval(interval);
    }, [int]);


    return (
        <div className="youwin">
            {!screenWin && (
                <div className="youwin_dialog_container">
                    {showDialog.length > 0 && showDialog.map((x, i) => {
                        return (
                            <div key={i} className="youwin_dialog">
                                <div className={x?.class}></div>
                                {x?.text}
                            </div>
                        )
                    })}
                </div>
            )}
            {screenWin && (
                <div className="screenwin">
                    You Win!
                </div>
            )}
        </div>
    )
}

export default YouWin