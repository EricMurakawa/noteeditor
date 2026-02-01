<?php

namespace App\Jobs;

use App\Models\Note;
use App\Service\NoteContentService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class NoteContentProcessJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private Note $note
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->note->update([
            'content' => (new NoteContentService($this->note))->process(),
        ]);
    }
}
