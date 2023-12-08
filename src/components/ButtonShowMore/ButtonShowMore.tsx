import '../../style/Button.scss';

interface Props {
  onShow: () => void;
}

export const ButtonShowMore: React.FC<Props> = ({ onShow }) => {
  return (
    <div className="button button__show-more" onClick={onShow}>Show more</div>
  )
}