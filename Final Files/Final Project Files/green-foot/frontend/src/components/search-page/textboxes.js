import React, {useEffect, useState, useRef} from 'react';

const Textboxes = ({value, sample}) => {
    return (
        <div class="mb-3">
            <label for={value} class="form-label">{value}</label>
            <input type="text" class="form-control" id={value} placeholder={sample}/>
        </div>
    )
}

export default Textboxes;