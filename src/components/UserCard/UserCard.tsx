import React from 'react';
import { User } from "../../type/User";
import '../../style/User.scss';
import '../../style/custom-tooltip.scss';

interface Props {
  user: User;
}

export const UserCart: React.FC<Props> = ({ user }) => {
  const truncateField = (field: string, maxLength: number) => {
    return field.length > maxLength ? `${field.slice(0, maxLength)}...` : field;
  };

  const truncatedName = truncateField(user.name, 25);
  const truncatedEmail = truncateField(user.email, 26);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const tooltip = event.currentTarget.querySelector('.custom-tooltip');
    if (tooltip) {
      tooltip.classList.add('show');
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const tooltip = event.currentTarget.querySelector('.custom-tooltip');
    if (tooltip) {
      tooltip.classList.remove('show');
    }
  };

  return (
    <div
      className="user__block"
    >
      <div className="user__photo">
        <img
          src={user.photo as string}
          alt={user.name}
          className="user__photo--img"
        />
      </div>
      <h3 
        className="user__name"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {truncatedName}
        <div className="custom-tooltip">
          <p>{user.name}</p>
        </div>
      </h3>
      <div className="user__info">
        <p className="user__info--position">{user.position}</p>
        <p 
          className="user__info--email"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {truncatedEmail}
          <div className="custom-tooltip">
            <p>{user.email}</p>
          </div>
        </p>
        <p className="user__info--phone">{user.phone}</p>
      </div>
    </div>
  );
};
