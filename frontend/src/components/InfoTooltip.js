import unsuccess from '../images/unsuccess.svg';
import success from '../images/success.svg';

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <img
          src={isSuccess ? success : unsuccess}
          alt={
            isSuccess ? 'Регистрация прошла успешно' : 'Регистрация не прошла'
          }
          className="popup__signup-icon"
        />
        <h3 className="popup__signup-title">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
      </div>
    </div>
  );
};

export default InfoTooltip;