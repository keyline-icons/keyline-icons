import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandPointerLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M1.044 8.0719C0.7791 9.4692 1.7465 10.7466 3.1045 10.9908L6.823 11.6588L6.7742 12.1715L6.7742 12.1734C6.6909 13.0528 7.0602 13.8542 7.6823 14.3815C7.4468 14.788 7.3271 15.2677 7.3757 15.7799C7.4645 16.7139 8.0955 17.4711 8.9391 17.7828C8.8354 18.0831 8.7931 18.4302 8.8727 18.8043C8.9907 19.3582 9.3415 19.8193 9.8199 20.1861C10.1557 20.4435 10.6055 20.6053 11.0278 20.7145C11.4769 20.8305 12.0053 20.9141 12.5766 20.9596C13.7184 21.0504 15.1012 20.9962 16.4797 20.7066C19.1939 20.1365 22.2203 18.5577 22.8925 15.0162C22.896 14.9976 22.8988 14.9784 22.9012 14.9596C23.0518 13.8062 23.1423 12.1112 22.2948 10.2545C21.4492 8.402 19.7321 6.5227 16.5373 4.8434L13.9721 3.3307C12.9381 2.7212 11.5795 2.9704 10.8531 3.9449C10.164 4.8696 10.279 6.1417 11.1069 6.9352L11.5679 7.3766L4.0233 6.0621C2.6686 5.8261 1.3078 6.682 1.044 8.0719Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.9076 10.8379L11.6923 11.5179M10.1834 14.1648L11.9756 14.4512M11.0129 17.1966L12.2503 17.4338"/>
    </svg>
  )
}
