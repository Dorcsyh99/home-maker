import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";
import * as firebase from 'firebase-admin';
import * as serviceAccount from './firebaseServiceAccount.json';

const firebase_params = {
  "type": serviceAccount.type,
  "project_id": serviceAccount.project_id,
  "private_key_id": serviceAccount.private_key_id,
  "private_key": serviceAccount.private_key,
  "client_email": serviceAccount.client_email,
  "client_id": serviceAccount.client_id,
  "auth_uri": serviceAccount.auth_uri,
  "token_uri": serviceAccount.token_uri,
  "auth_provider_x509_cert_url": serviceAccount.auth_provider_x509_cert_url,
  "client_x509_cert_url": serviceAccount.auth_provider_x509_cert_url
}

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
    private defaultApp: any;

    constructor() {
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params as any),
            databaseURL: "https://fir-auth-bd895.firebaseio.com"
        });
    }

    use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''))
            .then(async decodedToken => {
                const user = {
                    email: decodedToken.email
                }
                req['user'] = user;
                next();
            }).catch(error => {
                console.error(error);
                this.accessDenied(req.url, res);
            });
        }else {
            next();
        }
    }

    private accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied'
        });
    }
}