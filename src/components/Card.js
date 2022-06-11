import localStyle from './Card.module.css';

const Card = (props) => {
    return (
        <div className={localStyle.wrapperCard}>
            {props.children}
        </div>
    );
}

export default Card;
