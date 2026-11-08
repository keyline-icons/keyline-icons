import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlusForwardSlashMinus({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.179 1.4329C18.4955 0.9731 19.1188 0.8631 19.5711 1.183C20.0234 1.5029 20.1336 2.1228 19.8171 2.5726L5.821 22.5671C5.5045 23.0269 4.8812 23.1369 4.4288 22.817C3.9766 22.4971 3.8664 21.8772 4.1829 21.4274L18.179 1.4329Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M6.0017 1.0031C6.5537 1.0031 7.0014 1.4529 7.0014 2.0028L7.0004 5.002H10.0006C10.5527 5.002 11.0003 5.4518 11.0003 6.0017C11.0003 6.5515 10.5527 7.0014 10.0006 7.0014H7.0004L6.9985 10.0006C6.9983 10.5504 6.5507 11.0003 5.9988 11.0003C5.4467 11.0003 4.9991 10.5504 4.9991 10.0006L5.001 7.0014H2.0028C1.4506 7.0014 1.0031 6.5515 1.0031 6.0017C1.0031 5.4518 1.4506 5.002 2.0028 5.002H5.001L5.002 2.0028C5.0022 1.4529 5.4497 1.0031 6.0017 1.0031ZM21.9972 16.9986C22.5494 16.9986 22.9969 17.4485 22.9969 17.9983C22.9969 18.5482 22.5494 18.998 21.9972 18.998H13.9994C13.4473 18.998 12.9997 18.5482 12.9997 17.9983C12.9997 17.4485 13.4473 16.9986 13.9994 16.9986H21.9972Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
