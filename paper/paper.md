Paper
--------------
title: ChunkitApp 2.0, a speech segmentation app

authors:
  - name: Anna Galkova
    affiliation: ''

  - name: Alena Konina
    affiliation: '1'
    
  - name: Anna Mauranen
    affiliation: '1'

affiliations:
  - index: 1
    name: University of Helsinki
    
date: 16 March 2025

bibliography: chunkitapp_ref.bib

----------------

# Summary

ChunkitApp 2.0 is a data collection platform for speech segmentation
experiments. It allows researchers to design and run their experiments,
as well as pre-process their data. It initially grew out of the Chunking
in Language project (2017-2021, University of Helsinki, @mauranen2012linear)
and was later featured in our group’s research (@Vetchinnikova:2017, @Vetchinnikova:2022, @dobrego2023continuous, @vetchinnikova2023chunking).

# Statement of need

It was designed to present participants with a series of speech extracts
accompanied with their transcripts. Participants are then able to
segment the orthographic transcript for each extract by tapping an
interactive symbol between tokens (less strictly speaking, words)
according to experiment instructions. At the back-end, the tapped symbol
is recorded as a segment boundary. If participant taps the symbol twice,
the boundary is removed both from the interface and the data log. The
app was initially designed for collecting the most naturalistic data
possible, so we used tablets as a medium for running the experiment.
However, it can also run on a laptop or PC with a mouse.

Apart from raw chunking data, as we call it, which includes the position
and timestamp of each segment boundary marked by individual
participants, the ChunkitApp 2.0 aggregates the data across participants
and extracts. Moreover, it can run Monte Carlo simulations to ascertain
the degree of randomness in segmentation behaviour. Finally, researchers
can include comprehension questions after each extract, collect
background data on participants and their feedback, and offer
participants an English proficiency test.

The ChunkitApp features two tracks: Design & Run and Fetch & Analyse.
Design & Run lets researchers construct their experiment using
pre-programmed blocks and generates a link that allows participants to
take part in it. If necessary, integration with Prolific is built into
the app. The data is collected and saved on the server. Fetch & Analyse
is the part of the app where researchers can track data collection and
download raw and aggregated data.

The development of the app was funded by the Swedish Cultural Foundation
in Finland (grant number 157452). The authors declare that there is no
conflict of interest pertaining to the development of the app.

# Community guidelines

If you wish to contribute to the ChunkitApp 2.0, you need to fork the
initial repository. For publications and talks, see Citations on how to
cite.

If you encountered a bug, you can report an issue through Github or seek
support at <alena.konina@helsinki.fi>

# Citations

To cite the app, please use the following from the References section
(to be updated to a journal reference when published) - Galkova, Konina,
and Mauranen (2025)

# Acknowledgments

We would like to thank Aleksandra Dobrego, Svetlana Vetchinnikova,
Michal Josífko, and Nina Mikušova for their contributions to the initial
versions of the app.

# References

The app was modelled after the original ChunkitApp used for collecting
data in the CLUMP project. Below you can a list of publications
featuring data collected through the original app.
