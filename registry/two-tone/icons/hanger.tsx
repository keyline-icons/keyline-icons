import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hanger({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.999 2C13.7604 2 15.999 4.24 15.999 7C15.999 8.13 15.4757 9.1 14.8291 9.87C14.4424 10.33 13.9878 10.75 13.5166 11.13L21.5742 19.45C22.4473 20.35 21.8941 22 20.5137 22H3.4844C2.1041 22 1.5506 20.35 2.4238 19.45L10.6895 10.91C10.7201 10.87 10.7539 10.83 10.792 10.79L11.292 10.29L11.3653 10.23C11.3906 10.21 11.417 10.19 11.4444 10.17C12.1546 9.69 12.8174 9.16 13.294 8.59C13.7723 8.02 13.999 7.49 13.999 7C13.999 5.34 12.6559 4 10.999 4C9.3422 4 7.999 5.34 7.999 7C7.999 7.55 7.5513 8 6.999 8C6.4468 8 5.999 7.55 5.999 7C5.999 4.24 8.2377 2 10.999 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 7C7 4.79 8.7909 3 11 3C13.2091 3 15 4.79 15 7C15 8.61 13.5 10 12 11L11.5 11.5M11.6576 11.35L3.1428 20.15C2.8378 20.46 3.0538 21 3.4852 21H20.5149C20.9462 21 21.1622 20.46 20.8572 20.15L12.3424 11.35C12.1533 11.16 11.8467 11.16 11.6576 11.35Z"/>
    </svg>
  )
}
