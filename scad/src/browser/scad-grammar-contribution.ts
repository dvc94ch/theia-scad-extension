/*
 * Copyright (C) 2018 David Craven and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
import { injectable } from 'inversify'
import { LanguageGrammarDefinitionContribution, TextmateRegistry
       } from '@theia/monaco/lib/browser/textmate'
import { SCAD_LANGUAGE_ID, SCAD_LANGUAGE_NAME } from '../common';

@injectable()
export class ScadGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly config: monaco.languages.LanguageConfiguration = {
        comments: {
            lineComment: '//',
            blockComment: ['/*', '*/']
        },
        brackets: [['{', '}'], ['[', ']'], ['(', ')']],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
        ],
        surroundingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
        ],
    }

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: SCAD_LANGUAGE_ID,
            extensions: ['.scad'],
            aliases: [SCAD_LANGUAGE_NAME, 'scad'],
            mimetypes: ['text/x-scad-source', 'text/x-scad'],
        });

        monaco.languages.setLanguageConfiguration(SCAD_LANGUAGE_ID, this.config)

        const scadGrammar = require('../../data/scad.tmLanguage.json')
        registry.registerTextMateGrammarScope('source.scad', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: scadGrammar
                }
            }
        });

        registry.mapLanguageIdToTextmateGrammar(SCAD_LANGUAGE_ID, 'source.scad');
    }
}
