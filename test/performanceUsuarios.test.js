import http from 'k6/http';
import { sleep , check} from 'k6';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
        
    stages: [
        { duration: '10s', target: 50 },
        { duration: '30s', target: 50 },
        { duration: '10s', target: 0 }
    ], 
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    } 
};

export default function () {
    const url = pegarBaseURL() + '/usuarios';
    
    //gera nome e email únicos por iteração e usuário virtual
    const payload = JSON.stringify({
        nome: `User-${__VU}-${Date.now()}`, 
        email: `user${__VU}-${Date.now()}@mail.com`,
        senha: "123456"
    });
    
    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const resposta = http.post(url, payload, params);

    check(resposta, {
        'Status é 201': (r) => r.status === 201
    })

    sleep(1);
}