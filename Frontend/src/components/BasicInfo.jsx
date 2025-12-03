import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

// const BasicInfo = () => {
//   const { user } = useContext(AuthContext);
//   return (
//     <>
//       <div className="profile_2">
//         <div className="user_name">
//           <p>{user.name}</p>
//         </div>
//         <div className="user_details">
//           <p className="user_id">
//             <b>User Id</b>
//             <br />
//             {user.userid}
//           </p>
//           <p className="user_email">
//             <b>Email id </b>
//             <br />
//             {user.email}
//           </p>
//         </div>

//         <div className="row1">
//           <div className="details"></div>
//           <div className="rows_flex">
//             <div className="row2">
//               <p>Quizzes participated</p>
//               <b>{user.participated_quizzes.length}</b>
//             </div>
//             <div className="row3">
//               <p>Quizzes Created</p>
//               <b>{user.created_quizzes.length}</b>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const BasicInfo = () => {
    const { user } = useContext(AuthContext);
    console.log(JSON.stringify(user));

    return (
        <section className="profile-card">
            <header className="profile-header">
                <div className="avatar-placeholder">
                    <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
                </div>
                <div className="profile-info">
                    <h2 className="profile-name">{user?.name}</h2>
                    <p className="profile-email">{user?.email}</p>
                </div>
            </header>

            <div className="profile-body">
                <div className="info-grid">
                    <div className="info-item">
                        <h4>User ID</h4>
                        <p className="info-value">{user?.userid}</p>
                    </div>

                    <div className="info-item">
                        <h4>Quizzes Participated</h4>
                        <p className="info-value">
                            {user.participated_quizzes.length}
                        </p>
                    </div>

                    <div className="info-item">
                        <h4>Quizzes Created</h4>
                        <p className="info-value">
                            {user.created_quizzes.length}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BasicInfo;
