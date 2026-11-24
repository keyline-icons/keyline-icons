import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Avocado({ size = 24, ...props }: IconProps) {
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
      <path d="M11.0541 2.4952C13.2918 1.5503 15.7107 1.0343 18.185 1.0004C19.4673 0.983 20.7019 1.4846 21.6087 2.3913C22.5154 3.298 23.0171 4.5329 22.9995 5.8152C22.9318 10.7635 20.9359 15.4904 17.4364 18.9898C16.3862 20.04 15.2166 20.9634 13.9515 21.7411C10.5996 23.8015 6.2718 23.2923 3.4897 20.5103C0.7077 17.7282 0.1985 13.4004 2.2589 10.0485C3.0366 8.7835 3.96 7.6138 5.0101 6.5637C6.7598 4.814 8.8165 3.4401 11.0541 2.4952ZM13.5 14.5C13.5 12.2909 11.7091 10.5 9.5 10.5C7.2909 10.5 5.5 12.2909 5.5 14.5C5.5 16.7091 7.2909 18.5 9.5 18.5C11.7091 18.5 13.5 16.7091 13.5 14.5ZM11.5 14.5C11.5 15.6046 10.6046 16.5 9.5 16.5C8.3954 16.5 7.5 15.6046 7.5 14.5C7.5 13.3954 8.3954 12.5 9.5 12.5C10.6046 12.5 11.5 13.3954 11.5 14.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
