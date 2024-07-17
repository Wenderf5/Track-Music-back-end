import { HttpStatus, Injectable } from '@nestjs/common';
import { music } from './types/music';

@Injectable()
export class MusicService {
    async SearchMusic(music: string): Promise<music[] | HttpStatus> {
        try {
            const response = await fetch(`https://api.deezer.com/search?q=${music}`, {
                method: 'GET'
            });
            const data = await response.json();
            const arrayMusic: music[] = [];
            data.data.map((track: any, index: number) => {
                arrayMusic.push({
                    title: track.title,
                    preview: track.preview,
                    artist: {
                        name: track.artist.name
                    },
                    album: {
                        cover_big: track.album.cover_big
                    }
                });
            });
            return arrayMusic;
        } catch (error) {
            return HttpStatus.BAD_REQUEST;
        }
    }
}
