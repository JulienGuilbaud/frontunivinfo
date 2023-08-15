import './style.scss';


export function DeleteButton({ value,action }) {
    return (
        <div className='delete-button-contenair'>
          <button className='delete-button-item'onClick={action}>{value}</button>     
        </div>
      )
 }