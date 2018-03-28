/* eslint-env node, mocha */
import {expect} from 'chai';
import {format} from '../src';

describe('format', () => {
    it('should not modify text without markup', () => {
        const text = 'this is a test without markup';
        expect(format(text)).to.equal(text);
    });

    it('should return empty string for invalid input', () => {
        expect(format(undefined)).to.equal('');
        expect(format(null)).to.equal('');
        expect(format(() => {})).to.equal('');
        expect(format({})).to.equal('');
        expect(format(1)).to.equal('');
    });

    it('should escape special chars', () => {
        expect(format('this <c> has specialchars')).to.equal('this &lt;c&gt; has specialchars');
    });

    it('should replace markup', () => {
        expect(format('before<c=@test>content</c>after'))
            .to.equal('before<span class="color-format--test">content</span>after');
    });

    it('should handle multiple occurences', () => {
        expect(format('before<c=@test>content1</c>middle<c=@test>content2</c>after'))
            .to.equal('before<span class="color-format--test">content1</span>'+
                'middle<span class="color-format--test">content2</span>after');
    });
    
    it('should handle multiline markup', () => {
        expect(format('before<c=@test>content\n</c>after'))
            .to.equal('before<span class="color-format--test">content<br/></span>after');
    });

    it('should handle color markup', () => {
        expect(format('before<c=#bada55>content</c>after'))
            .to.equal('before<span class="color-format" style="color:#bada55">content</span>after');
    });

    it('should handle mix of markup', () => {
        expect(format('before<c=@test>content1</c>middle<c=#bada55>content2</c>after'))
            .to.equal('before<span class="color-format--test">content1</span>'+
                'middle<span class="color-format" style="color:#bada55">content2</span>after');
    });

    it('should find shortest match', () => {
        expect(format('before<c=@test>content</c>test</c>after'))
            .to.equal('before<span class="color-format--test">content</span>test&lt;/c&gt;after');
    });

    it('should handle malformed tags', () => {
        // https://gitter.im/arenanet/api-cdi?at=56af87e9dc33b33c75492836
        expect(format('before<c=@test>content<c>after'))
            .to.equal('before<span class="color-format--test">content</span>after');

        expect(format('before<c=@test>content<c/>after'))
            .to.equal('before<span class="color-format--test">content</span>after');

        expect(format('before<c@test>content</c>after'))
            .to.equal('before<span class="color-format--test">content</span>after');

        expect(format('before<c=test>content</c>after'))
            .to.equal('before<span class="color-format--test">content</span>after');

        expect(format('before<c@=test>content</c>after'))
            .to.equal('before<span class="color-format--test">content</span>after');
    });

    it('should handle newlines', () => {
        expect(format('before\nafter'))
            .to.equal('before<br/>after');
    });

    it('should handle br tags', () => {
        expect(format('before<br>after')).to.equal('before<br/>after');
        expect(format('before<br/>after')).to.equal('before<br/>after');
    });
    
    it('should handle missing close tags', () => {
        expect(format('before<c=@test>content'))
            .to.equal('before<span class="color-format--test">content</span>');

        expect(format('before<c=#bada55>content'))
            .to.equal('before<span class="color-format" style="color:#bada55">content</span>');

        expect(format('before<c=@test1>content1</c>test<c=@test2>content2'))
            .to.equal('before<span class="color-format--test1">content1</span>test<span class="color-format--test2">content2</span>');
    });
});
