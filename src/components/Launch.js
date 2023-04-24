import React from 'react'

const Launch = ({ setIsGameStarted }) => {
    return (
        <div className="launch">
            <div className="introduction">
                <div className="introduction_border">
                    <div className="introduction_border_image"></div>
                    არც ისე ცოტა რამ მსმენია შენზე, ვიცი რომ საშინელებათა ჟანრი გიყვარს,
                    ვიცი რომ ფილმებს გადახვევით უყურებ.
                    <br />
                    <br />
                    მე გხედავ !!!
                    <br />
                    <br />
                    <br />
                    მე გამოვკეტე ის სული ვინც ასე ძალიან გინდა რომ იხსნა!
                    <br />
                    მაგრამ გაუმკლავდები ჩემს თამაშებს?
                    <br />
                    შენი სული საკმაოდ ნათელია წინააღმდეგობის გასაწევად, მაგრამ აქ არც ისეთი ნათელია რომ ჩემი სიბნელე გადაფაროს!
                    <br />
                    <br />
                    თუ შენ მას ვერ იხსნი, მოგიწევს საკუთარი ჯოჯოხეთის მარყუჟში ჩემს დემონებს შეეგუო.
                    <br />
                    <br />
                    მზად ხარ თამაშისთვის? 😈
                    <br />
                    <br />
                    დაიხსომე, თამაში მხოლოდ სამართლიანია და აქ მხოლოდ ჩემი წესები მოქმედებს,
                    გამოიყენე მხოლოდ კლავიატურის ისრები.
                    <br />
                    3 მცდელობა გაქვს, მაგრამ შეგიძლია მეოთხე მცდელობის მოპოვება, თუმცა უნდა ეძიო მას!
                    ნუ შეეხები კედლებს, ისინი შენ გიცდიან...
                </div>
            </div>
            <div className="carrier">
                <button className="carrier_button" onClick={() => setIsGameStarted(true)}>დაწყება</button>
            </div>
        </div>
    )
}

export default Launch