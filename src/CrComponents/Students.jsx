import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Students extends Component {
    render() {
        return (
            <div>
                <Table striped bordered responsive className="mx-auto" style={{maxWidth: "600px"}}>
                    <thead>
                        <tr>
                            <th>Roll No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Kick</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>Satyam</td>
                            <td>s@1.ipu</td>
                            <td><img width="20px" style={{cursor: "pointer"}} src="https://cdn4.iconfinder.com/data/icons/web-basics-vol-05/512/user_human_person_avatar_minus_close_delete-512.png" alt="kick" /></td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>Hriday Gupta</td>
                            <td>h@2.ipu</td>
                            <td><img width="20px" style={{cursor: "pointer"}} src="https://cdn4.iconfinder.com/data/icons/web-basics-vol-05/512/user_human_person_avatar_minus_close_delete-512.png" alt="kick" /></td>
                        </tr>
                        <tr>
                            <td>003</td>
                            <td>Rishab</td>
                            <td>r@3.ipu</td>
                            <td><img width="20px" style={{cursor: "pointer"}} src="https://cdn4.iconfinder.com/data/icons/web-basics-vol-05/512/user_human_person_avatar_minus_close_delete-512.png" alt="kick" /></td>
                        </tr>
                        <tr>
                            <td>004</td>
                            <td>Kashish Jain</td>
                            <td>k@4.ipu</td>
                            <td><img width="20px" style={{cursor: "pointer"}} src="https://cdn4.iconfinder.com/data/icons/web-basics-vol-05/512/user_human_person_avatar_minus_close_delete-512.png" alt="kick" /></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Students;
