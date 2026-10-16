import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandHeart({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8.9168 13.0295C6.7265 11.1171 5 9.12 5 6.6C5 4.0594 7.149 2 9.8 2C11 2 12.0741 2.4367 13 3.2C13.9259 2.4367 15 2 16.2 2C18.851 2 21 4.0594 21 6.6C21 8.94 19.5113 10.8292 17.5449 12.6183" strokeOpacity="0.4"/>
      <path d="M13.4629 10.4631C14.6345 9.29144 16.5354 9.29144 17.707 10.4631C18.8785 11.6347 18.8786 13.5356 17.707 14.7072L13 19.4142C12.625 19.7891 12.1163 20.0001 11.5859 20.0002H5.41406L3.70703 21.7072C3.42105 21.993 2.99076 22.0787 2.61719 21.924C2.24366 21.7693 2.00015 21.4045 2 21.0002V16.3C2 16.0348 2.10549 15.7805 2.29297 15.593L5.2998 12.5861C5.67473 12.2112 6.18353 12.0003 6.71387 12.0002H9.5C10.1713 12.0002 10.7794 12.2659 11.2285 12.6965L13.4629 10.4631Z" fill="currentColor" stroke="none"/>
      <path d="M3 13V23"/>
    </svg>
  )
}
