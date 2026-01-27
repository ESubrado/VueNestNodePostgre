import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: 'John Doe',
            description: 'A sample profile'
        },{
            id: randomUUID(),
            name: 'Jane Smith',
            description: 'Another sample profile'
        },{
            id: randomUUID(),
            name: 'Alice Johnson',
            description: 'Yet another sample profile'
        }
    ];
    
    findAll() {        
        return this.profiles;
    }

    findOne(id: string) {
        return this.profiles.find(profile => profile.id === id);
    }

    create(createProfileDto: CreateProfileDto) {
        const newProfile = {
            id: randomUUID(),
            ...createProfileDto
        };
        this.profiles.push(newProfile);
        return newProfile;
    }

    update(id: string, updateProfileDto: UpdateProfileDto) {
        const profileIndex = this.profiles.find(profile => profile.id === id);
        if (!profileIndex) {
            return {};
        }

        profileIndex.name = updateProfileDto.name;
        profileIndex.description = updateProfileDto.description;

        return profileIndex;
    }

    delete(id: string) : void {
      const profileIndex = this.profiles.findIndex(profile => profile.id === id);
      if (profileIndex > -1) {
          this.profiles.splice(profileIndex, 1);
      }
    }
}