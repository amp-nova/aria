const fs = require('fs-extra')
const express = require('express')
const router = express.Router()
const _ = require('lodash')

const config = require('../util/config')
const { SecretsManager } = require("@aws-sdk/client-secrets-manager");

const { execAsync } = require('../util/helpers')

// note: if config.hub is undefined, credentials need to be available elsewhere.
let secretManager = new SecretsManager(config.hub)

router.get('/check', (req, res, next) => {
    res.status(200).send({ status: 'ok' })
})

router.get('/meta', (req, res, next) => {
    res.status(200).send({
        branch: config.git.branch,
        build_date: process.env.arm_build_date || new Date(),
        commit_hash: fs.existsSync('/etc/arm_commit_hash') && fs.readFileSync('/etc/arm_commit_hash', 'utf8').trim(),
        version: config.packageJson.version
    })
})

router.get('/import', (req, res, next) => {
    return res.status(200).send({ status: 'ok' })
})

router.post('/update', async (req, res, next) => {
    if (req.body.ref) {
        console.log(`git update [ ${req.body.ref} ]`)
    }

    if (process.env.NODE_ENV === `production`) {
        
    }
    // check if we are on the same branch as the update
    if (req.body.ref === `refs/heads/${config.git.branch}`) {
        console.log(`Received git update for this branch`)

        // do the git checkout
        let gitOutput = await execAsync('git checkout -- . && git pull --ff-only')
        console.log(`git output`)
        console.log(JSON.stringify(gitOutput))

        // do the npm install
        let npmOutput = await execAsync('npm i')
        console.log(`npm output`)
        console.log(JSON.stringify(npmOutput))

        return res.status(200).send({ npmOutput, gitOutput })
    }
    else {
        return res.status(200).send({ message: `Received git update but not for this branch` })
    }
})

router.get('/keys', async (req, res, next) => {
    try {
        let secretsList = await secretManager.listSecrets({})
        res.status(200).send({
            keys: _.map(secretsList.SecretList, 'Name')
        })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router