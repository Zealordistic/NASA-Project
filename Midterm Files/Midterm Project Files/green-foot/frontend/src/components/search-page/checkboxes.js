import React, {useEffect, useState, useRef} from 'react';

const Checkbox = ({callBackCheck, value}) => {  
    return (
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name={value} value="" id="flexCheckDefault" onClick={callBackCheck}/>
            <label class="form-check-label" id="check-value" for="flexCheckDefault">
                 {value}
            </label>
        </div>  
    )
}

export default Checkbox;

