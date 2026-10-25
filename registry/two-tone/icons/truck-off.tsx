import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TruckOff({ size = 24, ...props }: IconProps) {
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
      <path d="M22.9999 13.3987C23 13.4039 23 13.409 23 13.4142L23 17C23.0007 17.4713 22.8343 17.9275 22.5304 18.2877L21.3007 17.058C21.2954 17.0528 21.2902 17.0476 21.2851 17.0424L7.2426 3L11 3C13.2091 3 15 4.7909 15 7L16.5858 7C16.5888 7 16.5918 7 16.5948 7L16.9999 7C17.7956 7 18.5586 7.3161 19.1212 7.8787L22.1212 10.8787C22.6839 11.4413 22.9999 12.2044 22.9999 13L22.9999 13.3987ZM16.1715 19L3 19C1.8954 19 1 18.1046 1 17L1 7C0.9997 5.4276 1.9206 4.0009 3.3535 3.3535L19 19.0001L16.1715 19Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M14 18L14 14M4.1285 4.1285C2.8967 4.5019 2 5.6462 2 7L2 17C2 17.5523 2.4477 18 3 18L4 18M10 18L14 18M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM18.8233 18.8233C18.5094 19.5172 17.8111 20 17 20C15.8954 20 15 19.1046 15 18C15 17.1889 15.4828 16.4906 16.1767 16.1767M2 2L22 22" fill="none"/>
    </svg>
  )
}
