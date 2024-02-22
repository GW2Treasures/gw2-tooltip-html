import { format } from '../src/index';

describe('format', () => {
    it('should not modify text without markup', () => {
        const text = 'this is a test without markup';
        expect(format(text)).toEqual(text);
    });

    it('should return empty string for invalid input', () => {
        expect(format(undefined)).toEqual('');
        expect(format(null)).toEqual('');
        expect(format((() => {}) as any)).toEqual('');
        expect(format({} as any)).toEqual('');
        expect(format(1 as any)).toEqual('');
    });

    it('should escape special chars', () => {
        expect(format('this <c> has specialchars')).toEqual('this &lt;c&gt; has specialchars');
    });

    it('should replace markup', () => {
        expect(format('before<c=@test>content</c>after'))
            .toEqual('before<span class="color-format--test">content</span>after');
    });

    it('should handle multiple occurences', () => {
        expect(format('before<c=@test>content1</c>middle<c=@test>content2</c>after'))
            .toEqual('before<span class="color-format--test">content1</span>'+
                'middle<span class="color-format--test">content2</span>after');
    });
    
    it('should handle multiline markup', () => {
        expect(format('before<c=@test>content\n</c>after'))
            .toEqual('before<span class="color-format--test">content<br/></span>after');
    });

    it('should handle color markup', () => {
        expect(format('before<c=#bada55>content</c>after'))
            .toEqual('before<span class="color-format" style="color:#bada55">content</span>after');
    });

    it('should handle mix of markup', () => {
        expect(format('before<c=@test>content1</c>middle<c=#bada55>content2</c>after'))
            .toEqual('before<span class="color-format--test">content1</span>'+
                'middle<span class="color-format" style="color:#bada55">content2</span>after');
    });

    it('should find shortest match', () => {
        expect(format('before<c=@test>content</c>test</c>after'))
            .toEqual('before<span class="color-format--test">content</span>test&lt;/c&gt;after');
    });

    it('should handle malformed tags', () => {
        // https://gitter.im/arenanet/api-cdi?at=56af87e9dc33b33c75492836
        expect(format('before<c=@test>content<c>after'))
            .toEqual('before<span class="color-format--test">content</span>after');

        expect(format('before<c=@test>content<c/>after'))
            .toEqual('before<span class="color-format--test">content</span>after');

        expect(format('before<c@test>content</c>after'))
            .toEqual('before<span class="color-format--test">content</span>after');

        expect(format('before<c=test>content</c>after'))
            .toEqual('before<span class="color-format--test">content</span>after');

        expect(format('before<c@=test>content</c>after'))
            .toEqual('before<span class="color-format--test">content</span>after');
    });

    it('should handle newlines', () => {
        expect(format('before\nafter'))
            .toEqual('before<br/>after');
    });

    it('should handle br tags', () => {
        expect(format('before<br>after')).toEqual('before<br/>after');
        expect(format('before<br/>after')).toEqual('before<br/>after');
    });
    
    it('should handle missing close tags', () => {
        expect(format('before<c=@test>content'))
            .toEqual('before<span class="color-format--test">content</span>');

        expect(format('before<c=#bada55>content'))
            .toEqual('before<span class="color-format" style="color:#bada55">content</span>');

        expect(format('before<c=@test1>content1</c>test<c=@test2>content2'))
            .toEqual('before<span class="color-format--test1">content1</span>test<span class="color-format--test2">content2</span>');
    });
});
