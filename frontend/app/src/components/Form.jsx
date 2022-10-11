import React, { useEffect, useState } from 'react';

const Form = ({ selectDate, setFormview, url }) => {
    // todo split("/").join("-") を変換するよう修正する
    console.log(selectDate.start)
    const [startDate, setStartDate] = useState(selectDate.start.toLocaleDateString().split("/").join("-"));
    const [calenderId, setCalenderId] = useState(url.id);

    const handleChangeStartDate = (e) => {
        console.log("handleChangeStartDate")
        setStartDate(e.target.value);
    }

    const handleCanselClick = () => {
        setFormview(false);
    }

    return (
        <>
            <form>
                <input type="text" hidden name="calenderId" id="calenderId" value={calenderId} readOnly/>
                <div>
                    <label>タイトル</label><br />
                    <input type="text" />
                </div>
                <div>
                    <label>開始日</label><br />
                    <input type="date" name="start" id="start" value={startDate} onChange={handleChangeStartDate} />
                </div>
                <div>
                    <label>終了日</label><br />
                    <input type="date" name="end" id="end" />
                </div>
                <button onClick={handleCanselClick}>キャンセル</button>
            </form>
        </>
    );
};
export default Form;