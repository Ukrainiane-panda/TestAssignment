
import { User } from '../../type/User';
import { ButtonShowMore } from '../ButtonShowMore';
import { UserCart } from '../UserCard';
import { Loader } from '../Loader';

import '../../style/WorkingWithGETrequest.scss'
import '../../style/Users.scss';

interface Props {
  users: User[];
  onShow: () => void;
  isLoading: boolean;
}

export const WorkingWithGETrequest: React.FC<Props> = ({ 
  users, onShow, isLoading 
}) => {
  return (
    <section className="WorkingWithGETrequest" id='users'>
      <div className="container">
        <div className="WorkingWithGETrequest__content">
          <h2 className="WorkingWithGETrequest__title">Working with GET request</h2>
          <div className='WorkingWithGETrequest__users users'>
            {isLoading 
              ? <Loader />
              :  (<ul className="users__list">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="users__item user"
                >
                  <UserCart user={user} />
                </li>
              ))}
            </ul>)}
          </div>
          <div className='WorkingWithGETrequest__button'>
            <ButtonShowMore onShow={onShow} />
          </div>
        </div>
      </div>
    </section>
  );
};
