import React, { useEffect, useState } from 'react'

const YouWin = () => {
    const [screenWin, setScreenWin] = useState(false);

    const dialog = [
        {
            id: 1,
            text: `თქვენ ფიქრობთ რომ ჩემი დამარცხება შეგიძლიათ?
            ფიქრობთ რომ გაიმარჯვეთ? 😈`,
            class: "youwin_death"
        },
        {
            id: 2,
            text: `შენ წამართვი სული რომელიც არ გეკუთვნოდა,
            სამართლიან თამაშს პირდები მაგრამ თავად ხარ უსამართლო 😡`,
            class: "youwin_he"
        },
        {
            id: 3,
            text: `შენ ერთადერთი არ ხარ ვინც დავამარცხე 💅`,
            class: "youwin_she"
        },
        {
            id: 4,
            text: `ჰაჰაჰა😂... საცოდავებო, თქვენი სიცოცხლე ჩემს ხელშია,
            არ დაგავიწყდეთ რომ ჯერ კიდევ ჩემს საბყრობილეში იმყოფებით!
            გგონიათ გაგიშვებთ?😈`,
            class: "youwin_death"
        },
        {
            id: 5,
            text: `შენ არ შეგწევს ძალა რომ შეგვაკავო, უბრალოდ დანებდი და მიიღე დამარცხება🤏🙏.`,
            class: "youwin_he"
        },
        {
            id: 6,
            text: `მას არ შეუძლია მიმღებლობა, ის თავად არის საცოდავი...😪`,
            class: "youwin_she"
        },
        {
            id: 7,
            text: `არა, ვიცი რომ გეშინიათ! ვხედავ თქვენს თვალებში მღელვარება და შიში როგორ გჭამთ ნელ-ნელა,
            იმედი არ გქონდეთ რომ დაგინდობთ!👿`,
            class: "youwin_death"
        },
        {
            id: 8,
            text: `ეს შიშის გამოხედვა არ არის, შურისძიება რომელიც შენსკენ არის მომართული მას ვერ შეაკავებ😤.`,
            class: "youwin_he"
        },
        {
            id: 9,
            text: `მაშინ მითხარი გენიოსო, თუ არაფრის გეშინია და თუკი ჩემზე შურისძიებას აპირებთ,
            და თუ კი ეს რეალურად მოხდება, როდესაც ჯოჯოხეთიდან ამოხვალთ გგონიათ ისევ ისეთები იქნებით 
            როგორებიც აქამდე ყოფილხართ?👿`,
            class: "youwin_death"
        },
        {
            id: 10,
            text: `ვიცი რომ შევიცვლებით, მაგრამ ეს ცვლილება მხოლოდ გაგვაძლიერებს, შენ არ ხარ ერთადერთი
            სიკვდილილს ანგელოზი რომელიც ცდილობს რომ ცოცხალ სულებს დაეპატრონოს, შენ იმ მრავალთაგანი ხარ რომლების ჯერ
            კიდევ ჩვენს სიაში არიან.`,
            class: "youwin_he"
        },
        {
            id: 11,
            text: `მგონი დროა დაასრულო არსებობა იქ სადაც შენი ადგილი არ არის! 🈵`,
            class: "youwin_she"
        },
        {
            id: 12,
            text: `მოიცა რა? სიკვდილის რუნა სიდან გაქვს 💀`,
            class: "youwin_death"
        },
        {
            id: 13,
            text: `ეს მაშინ მოვიპოვე როდესაც შენი ძმა, არაწიო დავამარცხე.🤗`,
            class: "youwin_she"
        },
        {
            id: 14,
            text: `შეუძლებელია, ჩემს ძმა სიკვდილის მთავარ ანგელოზთან ვალში იყო, თუ ის მოკვდა ესეიგი ის მთლიანად გაქრა სამყაროდან 😮`,
            class: "youwin_death"
        },
        {
            id: 15,
            text: `შეუძლებელი ამ სამყაროში მხოლოდ შენი გამარჯვებაა 🈵`,
            class: "youwin_she"
        },
        {
            id: 16,
            text: `-შენ იყენებ რუნას სიკვდილის ანგელოზის, გაიოზის გასანადგურებლად`,
            class: "youwin_she"
        },
        {
            id: 17,
            text: `Gaiozi defeated, you win.`,
            class: "youwin_death"
        },
    ]

    const [showDialog, setShowDialog] = useState([]);

    const [int, setInt] = useState(0);
    useEffect(() => {
        let interval;
        let interval2;
        if (int < dialog.length) {
            interval = setInterval(() => {
                const _dialog = [...showDialog, {
                    ...dialog[int],
                    text: "",
                }];
                const _dialogText = dialog[int].text;
                let symbolCounter = 0;
                interval2 = setInterval(() => {
                    if (symbolCounter < _dialogText.length) {
                        _dialog.find(x => x.id === dialog[int].id).text += _dialogText[symbolCounter];
                        symbolCounter++;
                        if (int + 1 > 6) {
                            setShowDialog([..._dialog].filter((x, i) => i > 0));
                        } else {
                            setShowDialog([..._dialog]);
                        }
                    } else {
                        clearInterval(interval2);
                    }
                }, 7000 / _dialogText.length);
                setInt(int + 1);
                if (int + 1 > 6) {
                    setShowDialog([..._dialog].filter((x, i) => i > 0));
                } else {
                    setShowDialog([..._dialog]);
                }
            }, 8000);
        } if (int === dialog.length) {
            setTimeout(() => {
                setScreenWin(true)
            }, 8000);
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