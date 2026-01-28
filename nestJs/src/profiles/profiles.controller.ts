import { 
    Body, 
    Controller, 
    Delete, 
    Get,
    HttpCode, 
    HttpStatus, 
    NotFoundException, 
    Param, Post, 
    Put, Query, 
    ParseUUIDPipe, ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import type { UUID } from 'crypto';
import { ProfilesGuard } from './profiles.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    @Get()
    findAllViaLocation(@Query("location") location: string ) {
        return [{location}];
    }

    //route id params
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: UUID) { // Added a validation uuid pipe
        try {
            return this.profilesService.findOne(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }        
    }

    @Post()
    create(@Body(new ValidationPipe()) createProfileDto: CreateProfileDto) { 
        return this.profilesService.create(createProfileDto);
    }

    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: UUID, 
        @Body() updateProfileDto: UpdateProfileDto
    ){
        return this.profilesService.update(id, updateProfileDto);
    }

    @Delete(':id')
    @UseGuards(ProfilesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: UUID) : void {
        this.profilesService.delete(id);
    }
}
